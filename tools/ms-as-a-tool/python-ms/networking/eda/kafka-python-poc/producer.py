from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def publish_messages():
    for i in range(5):
        message = {'index': i, 'message': f'Hello {i}'}
        future = producer.send('my_topic', value=message)
        record_metadata = future.get(timeout=10)  # Waits for send confirmation
        print(f"Sent message {message} to {record_metadata.topic} partition {record_metadata.partition} offset {record_metadata.offset}")

    producer.flush()  # Ensures all messages are sent
    print("All messages have been flushed.")

if __name__ == "__main__":
    publish_messages()
