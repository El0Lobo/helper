import requests
from bs4 import BeautifulSoup

# URL of the Reddit page
url = 'https://www.reddit.com/r/Piracy/wiki/megathread/#wiki_.1F4DC_.279C_megathread'

# Send an HTTP GET request
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find the post elements (customize the selector as needed)
    post_elements = soup.find_all('div', class_='post-class')

    # Loop through the post elements and extract information and links
    for post in post_elements:
        description = post.find('p', class_='description-class').text
        link = post.find('a', class_='link-class')['href']
        
        # Print or store the description and link as needed
        print(f"Description: {description}")
        print(f"Link: {link}")
else:
    print("Failed to retrieve the Reddit page.")
