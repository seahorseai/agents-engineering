from langsmith import Client
from langsmith.evaluation import evaluate
from langchain_openai import ChatOpenAI

# Initialize client and model
client = Client()
model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

# Define dataset name (this should exist in your LangSmith project)
dataset_name = "qa_dataset"  

# Define a simple evaluation function
def exact_match(run, example):
    """Check if model output matches expected answer exactly."""
    prediction = run.outputs["output"]
    reference = example.outputs["output"]
    return {"score": prediction.strip() == reference.strip()}

# Run evaluation
results = evaluate(
    run=dataset_name,   # Dataset created in LangSmith
    evaluators=[exact_match],
    model=model,
    client=client,
    experiment_prefix="example-eval"
)

print("Evaluation complete. Results:")
for r in results:
    print(r)
