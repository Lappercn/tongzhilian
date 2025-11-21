const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
    quality: 80, // JPEG 质量 (0-100)
    maxWidth: 1920, // 最大宽度
    maxHeight: 1920, // 最大高度
    targetSizeKB: 500, // 目标文件大小 (KB)
};

// 递归获取所有图片文件
function getAllImages(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllImages(filePath, fileList);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// 压缩单个图片
async function compressImage(imagePath) {
    try {
        const stats = fs.statSync(imagePath);
        const originalSizeKB = (stats.size / 1024).toFixed(2);

        console.log(`\n处理: ${path.basename(imagePath)}`);
        console.log(`原始大小: ${originalSizeKB} KB`);

        // 如果文件已经很小，跳过
        if (stats.size / 1024 < CONFIG.targetSizeKB) {
            console.log(`✓ 文件已经足够小，跳过`);
            return;
        }

        const ext = path.extname(imagePath).toLowerCase();
        const tempPath = imagePath.replace(ext, `_temp${ext}`);

        // 读取图片元数据
        const metadata = await sharp(imagePath).metadata();

        // 计算新尺寸
        let width = metadata.width;
        let height = metadata.height;

        if (width > CONFIG.maxWidth || height > CONFIG.maxHeight) {
            const ratio = Math.min(CONFIG.maxWidth / width, CONFIG.maxHeight / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
            console.log(`调整尺寸: ${metadata.width}x${metadata.height} → ${width}x${height}`);
        }

        // 压缩图片
        let sharpInstance = sharp(imagePath).resize(width, height, {
            fit: 'inside',
            withoutEnlargement: true
        });

        // 根据格式应用不同的压缩策略
        if (ext === '.png') {
            // PNG 转换为 JPEG 以获得更好的压缩
            await sharpInstance
                .jpeg({ quality: CONFIG.quality, progressive: true })
                .toFile(tempPath.replace('.png', '.jpg'));

            // 删除原 PNG，重命名 JPG
            fs.unlinkSync(imagePath);
            fs.renameSync(tempPath.replace('.png', '.jpg'), imagePath.replace('.png', '.jpg'));

            const newStats = fs.statSync(imagePath.replace('.png', '.jpg'));
            const newSizeKB = (newStats.size / 1024).toFixed(2);
            const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

            console.log(`✓ 压缩完成: ${newSizeKB} KB (减少 ${reduction}%)`);
            console.log(`  格式转换: PNG → JPEG`);
        } else {
            // JPEG/WebP 压缩
            await sharpInstance
                .jpeg({ quality: CONFIG.quality, progressive: true })
                .toFile(tempPath);

            // 替换原文件
            fs.unlinkSync(imagePath);
            fs.renameSync(tempPath, imagePath);

            const newStats = fs.statSync(imagePath);
            const newSizeKB = (newStats.size / 1024).toFixed(2);
            const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

            console.log(`✓ 压缩完成: ${newSizeKB} KB (减少 ${reduction}%)`);
        }

    } catch (error) {
        console.error(`✗ 处理失败: ${error.message}`);
    }
}

// 主函数
async function main() {
    const targetDir = path.join(__dirname, 'doc', '团队风采');

    console.log('='.repeat(60));
    console.log('图片压缩工具');
    console.log('='.repeat(60));
    console.log(`目标目录: ${targetDir}`);
    console.log(`质量设置: ${CONFIG.quality}%`);
    console.log(`最大尺寸: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
    console.log(`目标大小: ${CONFIG.targetSizeKB} KB`);
    console.log('='.repeat(60));

    if (!fs.existsSync(targetDir)) {
        console.error('错误: 目录不存在');
        return;
    }

    const images = getAllImages(targetDir);
    console.log(`\n找到 ${images.length} 张图片\n`);

    let totalOriginalSize = 0;
    let totalNewSize = 0;

    for (const imagePath of images) {
        const beforeSize = fs.statSync(imagePath).size;
        await compressImage(imagePath);

        // 检查文件是否被转换为 jpg
        const possiblePaths = [
            imagePath,
            imagePath.replace('.png', '.jpg')
        ];

        let afterSize = 0;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
                afterSize = fs.statSync(p).size;
                break;
            }
        }

        totalOriginalSize += beforeSize;
        totalNewSize += afterSize;
    }

    console.log('\n' + '='.repeat(60));
    console.log('压缩完成!');
    console.log(`原始总大小: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`压缩后总大小: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`总共节省: ${((1 - totalNewSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log('='.repeat(60));
}

main().catch(console.error);
