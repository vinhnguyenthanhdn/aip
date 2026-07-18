# AIP-C01 Cram Sheet — Overview & Glossary


## Glossary theo Domain

### D1 — FM Integration, Data Management & Compliance (31%)

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **Amazon Bedrock** | API serverless để gọi nhiều foundation model (Claude, Titan/Nova, Llama, Mistral, Cohere, Stable Diffusion, Jurassic-2) qua một giao diện thống nhất |
| **Bedrock Converse API** | API hội thoại thống nhất giữa các model, mang `guardrailConfig`, `inferenceConfig`, `toolConfig`, prompt variables |
| **InvokeModelWithResponseStream** | Gọi model và nhận phản hồi streaming từng phần (token-by-token) |
| **bedrock-agent-runtime** | Namespace API cho agent + knowledge base: `InvokeAgent`, `Retrieve`, `RetrieveAndGenerate` |
| **Fine-tuning** | Huấn luyện thêm bằng cặp prompt/completion có nhãn để dạy style/task, giảm token/prompt |
| **Continued Pre-training** | Huấn luyện tiếp trên văn bản thô không nhãn để "nạp" kiến thức domain |
| **LoRA (Low-Rank Adaptation)** | Kỹ thuật fine-tune rẻ bằng ma trận low-rank, không đổi model gốc |
| **RAG (Retrieval-Augmented Generation)** | Mô hình "open-book": truy xuất dữ liệu ngoài rồi chèn vào prompt thay vì train lại — tốt cho dữ liệu mới/proprietary, giảm hallucination |
| **Embeddings / k-NN** | Vector hoá dữ liệu, tìm kiếm ngữ nghĩa bằng k-nearest-neighbors, đo bằng cosine similarity |
| **Bedrock Knowledge Bases** | Dịch vụ RAG được quản lý sẵn trên S3/SharePoint/Confluence, có trích dẫn (citation), lọc theo metadata |
| **Chunking (Fixed / Hierarchical / Semantic / None)** | Chiến lược chia nhỏ dữ liệu trước khi embedding; semantic chunking giữ ngữ cảnh tốt nhất nhưng tốn chi phí |
| **S3 Vectors** | Kho vector rẻ (~90%) cho dữ liệu lạnh/ít truy cập, độ trễ 100ms–1s |
| **OpenSearch (vector store)** | Backend chính cho Knowledge Base, hỗ trợ semantic + hybrid search, ANN (HNSW/IVF), reranking |
| **Bedrock Data Automation (BDA)** | Trích xuất dữ liệu có cấu trúc (JSON) từ tài liệu/ảnh/video/audio bằng "blueprints", gọi qua `InvokeDataAutomationAsync` |
| **Amazon Comprehend** | NLP: phát hiện PII, toxicity, NER, phân loại tuỳ chỉnh; có bản Comprehend Medical (PHI/HIPAA) |
| **AWS Glue** | ETL serverless + Data Catalog; Glue Data Quality dùng DQDL để kiểm tra chất lượng dữ liệu |
| **Amazon Transcribe** | Chuyển giọng nói thành văn bản (ASR), có redact PII |
| **Amazon Textract** | Trích xuất dữ liệu từ tài liệu/ảnh scan |
| **Titan Multimodal Embeddings** | Model embedding đa phương tiện (text + ảnh base64) trong cùng một vector space |
| **Prompt engineering (Zero-shot / Few-shot / Chain-of-Thought)** | Kỹ thuật viết prompt: không ví dụ / có ví dụ / yêu cầu suy luận từng bước |
| **Prompt injection / Prompt leaking** | Tấn công chèn lệnh độc hại vào prompt hoặc dò system prompt — giảm thiểu bằng guardrails |
| **Bedrock Prompt Management** | Quản lý phiên bản, biến `{{double_braces}}`, và các biến thể prompt tập trung |
| **Bedrock Flows** | Chain nhiều prompt/model qua Nodes + Connections (có điều kiện), trước gọi là "Prompt Flows" |
| **AWS Well-Architected Generative AI Lens** | Bộ khung best practice GenAI theo 6 pillar (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability) |

### D2 — Implementation & Integration (26%)

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **Bedrock Agents** | FM + memory + planning + tools (Action Groups chạy trên Lambda); có thể dùng Knowledge Base (agentic RAG) |
| **Multi-agent patterns** | Orchestrator-Worker-Synthesizer, Routing (router chọn 1 agent chuyên biệt), Parallelization, Prompt Chaining, Evaluator-Optimizer |
| **Agent memory (short/long-term)** | Short-term = lịch sử chat theo session (ElastiCache/DynamoDB); long-term = insight/tóm tắt/user prefs (DynamoDB, AgentCore Memory, Mem0) |
| **Strands Agents SDK** | SDK mã nguồn mở của Amazon để tự viết agent đơn lẻ, dùng decorator `@tool`, hỗ trợ MCP |
| **AWS Agent Squad** | Framework mã nguồn mở định tuyến (routing) request tới nhiều agent theo intent classification |
| **Amazon Bedrock AgentCore** | Nền tảng chạy agent serverless bất kỳ framework nào, có Runtime/Memory/Gateway/Identity built-in |
| **AgentCore Policy (Cedar)** | Chặn/cho phép từng tool call tại Gateway theo policy viết bằng ngôn ngữ Cedar (deny-by-default) |
| **Model Context Protocol (MCP)** | Giao thức chuẩn agent↔tool ("USB-C cho AI apps"), JSON-RPC 2.0, transport stdio/HTTP streaming |
| **OpenAPI schema (cho Action Groups)** | Mô tả tool: tham số đầu vào, đầu ra, lỗi — dùng cho Bedrock Action Groups |
| **AWS Lambda (cho GenAI)** | Hàm serverless nối agent↔tool, gọi FM theo yêu cầu, tiền/hậu xử lý |
| **AWS Step Functions** | Điều phối workflow nhiều bước cố định, có retry/catch, Parallel, Map, `waitForTaskToken` (human approval); giới hạn 256 KB dữ liệu truyền giữa state |
| **Amazon API Gateway** | Cổng vào cho API/model: WebSocket (streaming), HTTP API, Edge/Regional/Private endpoint |
| **AWS AppConfig** | Đổi cấu hình (chọn FM, feature flag) không cần deploy lại code |
| **SQS / SNS / EventBridge** | Giải kết nối hệ thống: SQS = hàng đợi điểm-điểm, SNS = pub/sub fan-out, EventBridge = event-pattern rule + schedule |
| **SageMaker model deployment** | Real-time endpoint, Batch Transform, Async endpoint, Serverless; Neo (edge), Inference Components |
| **SageMaker deployment guardrails** | Chiến lược chuyển traffic: All-at-once, Canary, Linear, Shadow test (không phục vụ user thật) |
| **Model servers & compression** | DJL Serving/TorchServe/Triton; quantization, pruning, knowledge distillation |
| **Cross-Region Inference Profile** | Định tuyến gọi Bedrock qua nhiều Region (geo-coded ID) |
| **Bedrock Custom Model Import** | Train/tune ở SageMaker rồi triển khai qua Bedrock inference serverless |
| **Amazon Q Business** | Trợ lý GenAI quản lý sẵn cho doanh nghiệp, chỉ trả lời theo tài liệu người dùng có quyền truy cập (IAM Identity Center + `acl.json`) |
| **Amazon A2I (Augmented AI)** | Đưa các trường hợp AI không chắc chắn cho con người review (human-in-the-loop) |

### D3 — AI Safety, Security & Governance (20%)

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **Bedrock Guardrails** | Lọc nội dung native của Bedrock: denied topics, content filter, mask/block PII, Contextual Grounding Check (chống hallucination), Automated Reasoning Checks |
| **Amazon Comprehend (redaction)** | Phát hiện/redact PII bên ngoài Bedrock, trên input/output hoặc trước khi ingest vào Knowledge Base |
| **IAM (Identity and Access Management)** | Quản lý quyền least-privilege; Policy = Version + Statement (Effect/Action/Resource/Condition); condition key, ABAC |
| **IAM Identity Center vs Cognito** | Identity Center = workforce SSO nhiều account AWS Organization; Cognito = định danh cho end-user của ứng dụng (User Pools/Identity Pools) |
| **AWS KMS (Key Management Service)** | Quản lý khoá mã hoá, envelope encryption, audit qua CloudTrail; loại khoá Symmetric/Asymmetric, Owned/Managed/Customer Managed/Imported |
| **Secrets Manager vs Parameter Store** | Secrets Manager = tự động rotate secret (tích hợp RDS); Parameter Store = cấu hình rẻ, không rotation built-in |
| **Amazon Macie** | Dùng ML + pattern matching phát hiện PII đang lưu trữ (at rest) trong S3, tích hợp EventBridge |
| **Masking / Salting** | Che dữ liệu nhạy cảm (mask/shuffle/hash/encrypt); salting = thêm giá trị ngẫu nhiên trước khi hash mật khẩu |
| **Encryption in-flight / at-rest / client-side** | TLS khi truyền; SSE-S3/SSE-KMS/SSE-C khi lưu trữ; client-side = server không thấy plaintext |
| **VPC Endpoint (Interface/Gateway) & PrivateLink** | Kết nối riêng tư tới AWS service không qua Internet; Gateway chỉ cho S3/DynamoDB, Interface cho hầu hết dịch vụ (kể cả Bedrock) |
| **AWS WAF** | Tường lửa Layer-7 chặn SQLi/XSS/DDoS theo rate, gắn vào ALB/API Gateway/CloudFront |
| **AWS Control Tower / SCP (Service Control Policy)** | Quản trị đa tài khoản; SCP = kiểm soát preventive (chặn hành động/Region/model); AWS Config = detective (gắn cờ tài nguyên không tuân thủ) |
| **AWS CloudTrail** | Ghi log mọi API call (ai gọi gì khi nào), phục vụ audit/compliance, kể cả API Bedrock |
| **Responsible AI dimensions** | Fairness, Explainability, Privacy & Security, Safety, Controllability, Veracity & Robustness, Governance, Transparency |
| **SageMaker Clarify** | Đo bias và explainability (giải thích mô hình) |
| **SageMaker Model Monitor** | Theo dõi model/data drift khi chạy production |
| **Bedrock Agent Tracing** | Ghi lại trace từng bước reasoning của agent (KB dùng, action group, lỗi...) |

### D4 — Operational Efficiency & Optimization (12%)

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **CountTokens API** | Ước tính số token của một request mà không cần chạy inference, miễn phí |
| **TTFT (Time To First Token)** | Chỉ số đo độ trễ tới token đầu tiên khi streaming |
| **Context pruning / maxTokens** | Giảm token: giới hạn số chunk retrieve, lọc metadata, giới hạn độ dài phản hồi |
| **Bedrock Intelligent Prompt Routing** | Định tuyến câu hỏi đơn giản/phức tạp tới model nhỏ/lớn tương ứng để tối ưu chi phí |
| **Provisioned Throughput / Model Units (MU)** | Mua trước công suất inference ổn định, bắt buộc với custom/fine-tuned model |
| **Batch Inference** | Gửi nhiều prompt qua S3, xử lý hàng loạt, rẻ hơn nhưng không real-time |
| **Prompt caching / Semantic caching / Edge caching** | Cache prefix tĩnh của prompt; cache theo độ tương đồng ngữ nghĩa (embedding + k-NN); cache tại CloudFront |
| **Latency-optimized inference** | `performanceConfig={"latency":"optimized"}` giảm TTFT và tăng tốc độ output token/giây |
| **Temperature / top_p / top_k** | Tham số kiểm soát độ ngẫu nhiên khi sinh văn bản (chỉ chọn temperature HOẶC top_p, không cả hai) |
| **Exponential backoff & jitter / Circuit breaker** | Chiến lược retry khi bị throttle, tránh gọi đồng loạt và tránh lỗi dây chuyền |
| **Connection pooling** | Tái sử dụng kết nối HTTP thay vì tạo mới mỗi request |
| **Cross-Region Inference (Geographic/Global profile)** | Phân tán tải qua nhiều Region; Geographic giữ dữ liệu trong khu vực, Global tối ưu throughput |
| **UltraServers (Trn2, P6e-GB200)** | Cụm interconnect băng thông cao/độ trễ thấp giữa các instance AI trên EC2 |

### D5 — Testing, Validation & Troubleshooting (11%)

| Thuật ngữ | Giải thích ngắn |
|---|---|
| **Human evaluation / Benchmark datasets / LLM-as-a-judge / Hybrid** | Các cách đánh giá chất lượng FM: người đánh giá, bộ dữ liệu chuẩn, model khác chấm điểm, hoặc kết hợp |
| **ROUGE / BLEU / BERTScore** | Chỉ số đánh giá văn bản: ROUGE (recall, tóm tắt), BLEU (precision, dịch máy), BERTScore (tương đồng ngữ nghĩa qua embedding) |
| **Amazon Bedrock Model Evaluation jobs** | Job đánh giá FM có sẵn trên AWS: tự động, human-based (qua A2I/Ground Truth), hoặc LLM-as-a-judge |
| **RAG evaluation (Retrieve-only / Retrieve-and-generate)** | Đánh giá riêng phần truy xuất (relevance/coverage) hoặc cả câu trả lời (faithfulness, citation precision) |
| **Canary deployment / Auto-rollback** | Triển khai dần dần và tự động rollback khi không đạt ngưỡng chất lượng |
| **Amazon CloudWatch (cho GenAI)** | Theo dõi log, token/cost anomaly, Logs Insights, composite alarms |
| **AWS X-Ray** | Distributed tracing từng request qua nhiều service để tìm điểm nghẽn độ trễ |
| **AgentCore Evaluations & Observability** | Đánh giá hiệu năng/consistency của agent, tích hợp CloudWatch GenAI Observability, Strands, LangGraph, OpenTelemetry |

---