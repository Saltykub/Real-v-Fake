import random
import re
import time
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from bs4 import BeautifulSoup
### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Change to ["http://localhost:3000"] for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/getQueryData")
async def fetch_product(url: str = Query(..., title="Product URL", description="Amazon product link")):
    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/537.36"
    ]

    headers = {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept-Language": "en-US,en;q=0.5"
    }

    delay = random.uniform(1, 5)  # Random delay between 1-5 seconds
    time.sleep(delay)
    
    # Send GET Request
    async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)

    if response.status_code != 200:
        return {"error": f"Failed to fetch product page. HTTP Status: {response.status_code}"}
    # Parse HTML with BeautifulSoup
    soup = BeautifulSoup(response.content, "html.parser")

    # Extract Product Details
    try:
        title = soup.find("span", {"id": "productTitle"}).text.strip()
    except:
        title = "Title not found"

    try:
        price = soup.find("span", {"class": "a-price-whole"}).text.strip()
        price_fraction = soup.find("span", {"class": "a-price-fraction"}).text.strip()
        price = f"{price}{price_fraction}"
        price = float(price)
    except:
        price = "Price not found"

    try:
        rating = soup.find("span", {"class": "a-icon-alt"}).text.strip()
        rating = rating[0:3]
        rating = float(rating)
    except:
        rating = "No rating"

    try:
        review_count = soup.find("span", {"id": "acrCustomerReviewText"}).text.strip()
        review_sz = len(review_count)
        review_count = review_count[0:review_sz-8]
        review_count = re.sub(r"[^\d]", "", review_count)
        review_count = int(review_count)
    except:
        review_count = "No reviews"

    try:
        description = soup.find("div", {"id": "productDescription"}).text.strip()
    except:
        description = "No description found"

    try:
        image_tag = soup.find("img", {"id": "landingImage"}).get("src")
    except:
        image_tag = "Product image not found."

    #Extract Reviews
    reviews = []
    review_blocks = soup.find_all("span", {"data-hook": "review-body"})

    for review in review_blocks:
        temp = review.text.strip()
        temp = temp.replace("\nRead more","").strip()
        reviews.append({"content" : temp})

    review_head = [head.text.strip() for head in soup.find_all("span", {"data-hook": "review-title"})]
        # find the missing sg review head

    sg_review_head = [
        head.find_all("span")[-1].text.strip() 
        for head in soup.find_all("a", {"data-hook": "review-title"})
    ]

    total_review_head = sg_review_head + review_head

    for review, head in zip(reviews, total_review_head):
        review['head'] = head

    product_data = {
        "title": title,
        "price": price,
        "rating": rating,
        "totalReviews": review_count,
        "description": description,
        "reviews": reviews, # i put keys as 'content' and 'rating' :3
        "imageUrl":image_tag
    }

    return product_data



