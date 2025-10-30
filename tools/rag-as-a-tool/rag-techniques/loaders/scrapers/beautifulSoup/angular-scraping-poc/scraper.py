from selenium import webdriver
from bs4 import BeautifulSoup
import time

driver = webdriver.Chrome()  # or Firefox, Edge, etc.
driver.get('https://seahorsefactory.com/')
time.sleep(5)  # wait for JS to load (better to use WebDriverWait)

soup = BeautifulSoup(driver.page_source, 'html.parser')

#print(soup.prettify())

world_titles = soup.find_all('h3')

print(world_titles)

driver.quit()
