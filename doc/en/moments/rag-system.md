---
outline: deep
---

# Building Enterprise RAG System from 0 to 1

**Author: Zhang Junhao**
**Date: 2024-05-20**
**Tags: AI, RAG, Vector DB**

---

## Background

With the rise of Large Language Models (LLM), the demand for private knowledge base Q&A in enterprises is growing. General LLMs lack domain-specific knowledge and suffer from hallucinations. Retrieval-Augmented Generation (RAG) has become the key to solving this problem.

## Core Architecture

Our RAG system mainly includes the following modules:

1.  **Data Processing Pipeline (ETL)**
    *   Supports parsing of various document formats such as PDF, Word, Markdown.
    *   Uses LangChain's `RecursiveCharacterTextSplitter` for text chunking to ensure semantic integrity.
2.  **Vector Store**
    *   Selection: We compared Milvus, Qdrant, and pgvector, and finally chose **Qdrant** because it is lightweight, high-performance, and supports Rust.
    *   Embedding Model: Used BGE-Large-zh-v1.5, which performs excellently in Chinese semantic matching.
3.  **Retrieval & Generation**
    *   **Hybrid Retrieval**: Combining keyword retrieval (BM25) with vector retrieval to improve recall rate.
    *   **Rerank**: Introduced BGE-Reranker to refine the recall results.

## Pitfalls and Solutions

### 1. Document Splitting Granularity
Splitting too finely leads to broken semantics, while splitting too coarsely includes too much noise.
**Solution**: Adopt "Parent-Child Indexing" strategy. Match small chunks (child documents) during retrieval, and recall the larger chunks (parent documents) they belong to during generation.

### 2. Table Data Processing
Tables in PDFs lose structural information when converted directly to text.
**Solution**: Use specialized table parsing models (such as Table Transformer) to extract table structures and convert them to Markdown format or JSON for storage.

## Summary

Building a RAG system is not just about calling packages, but more about refined data processing and deep understanding of business scenarios. In the future, we will explore GraphRAG (Knowledge Graph-based RAG) to handle more complex reasoning problems.
