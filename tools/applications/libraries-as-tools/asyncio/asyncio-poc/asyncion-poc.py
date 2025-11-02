import asyncio
import random

async def do_work(name, delay):
    print(f"{name} started, will take {delay:.2f} seconds")
    await asyncio.sleep(delay)
    print(f"{name} finished after {delay:.2f} seconds")

async def main():
    # Create tasks with random delays
    tasks = [
        do_work("Task A", random.uniform(1, 3)),
        do_work("Task B", random.uniform(1, 3)),
        do_work("Task C", random.uniform(1, 3)),
    ]
    
    await asyncio.gather(*tasks)
    print("All tasks completed!")

# Run the event loop
if __name__ == "__main__":
    asyncio.run(main())