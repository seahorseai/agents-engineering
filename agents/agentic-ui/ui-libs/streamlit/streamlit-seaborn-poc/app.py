import streamlit as st
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

# Streamlit page setup
st.title("Simple Streamlit + Seaborn Example 🌈")

# Sidebar for user input
st.sidebar.header("User Input Parameters")

num_points = st.sidebar.slider("Number of data points", 10, 1000, 100)
mean = st.sidebar.number_input("Mean", value=0.0)
std_dev = st.sidebar.number_input("Standard Deviation", value=1.0)

# Generate random normal data
data = np.random.normal(mean, std_dev, num_points)
df = pd.DataFrame(data, columns=["Values"])

# Show dataframe
st.subheader("Generated Data")
st.dataframe(df.head())

# Plot histogram with Seaborn
st.subheader("Distribution Plot")

fig, ax = plt.subplots()
sns.histplot(df["Values"], bins=20, kde=True, color="cornflowerblue", ax=ax)
ax.set_title("Distribution of Generated Data", fontsize=14)
st.pyplot(fig)

# Summary statistics
st.subheader("Summary Statistics")
st.write(df.describe())

# Regenerate button
if st.button("Generate New Data"):
    st.experimental_rerun()
