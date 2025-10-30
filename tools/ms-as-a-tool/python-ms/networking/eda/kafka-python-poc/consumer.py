from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'my_topic',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',  # Starts from the earliest message
    enable_auto_commit=True,       # Commits offsets periodically
    group_id='example-group'
)

def consume_messages():
    print("Starting consumer… waiting for messages.")
    for msg in consumer:
        print(f"Received message: topic={msg.topic}, partition={msg.partition}, offset={msg.offset}, key={msg.key}, value={msg.value}")

if __name__ == "__main__":
    consume_messages()
