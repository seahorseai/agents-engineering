import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# App title
st.title("Simple Streamlit Example 🚀")

# Sidebar inputs
st.sidebar.header("User Input Parameters")

# Collect user inputs
num_points = st.sidebar.slider("Number of data points", 10, 1000, 100)
mean = st.sidebar.number_input("Mean", value=0.0)
std_dev = st.sidebar.number_input("Standard Deviation", value=1.0)

# Generate random data
data = np.random.normal(mean, std_dev, num_points)
df = pd.DataFrame(data, columns=["Values"])

# Display data
st.subheader("Generated Data")
st.dataframe(df.head())

# Plot histogram
fig, ax = plt.subplots()
ax.hist(df["Values"], bins=20, color="skyblue", edgecolor="black")
ax.set_title("Distribution of Generated Data")
st.pyplot(fig)

# Summary statistics
st.subheader("Summary Statistics")
st.write(df.describe())

# Simple interaction
if st.button("Generate New Data"):
    st.experimental_rerun()
