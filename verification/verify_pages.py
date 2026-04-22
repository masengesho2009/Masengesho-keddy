from playwright.sync_api import sync_playwright
import os

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Base path for screenshots
        base_path = "/home/jules/verification"
        os.makedirs(base_path, exist_ok=True)

        # Files to verify
        files = ["index.html", "about.html", "menu.html", "testimonials.html", "gallery.html", "contact.html"]

        for file in files:
            file_path = f"file://{os.getcwd()}/{file}"
            page.goto(file_path)
            # Wait for content to load
            page.wait_for_timeout(1000)
            page.screenshot(path=f"{base_path}/{file.replace('.html', '_full.png')}", full_page=True)
            print(f"Captured {file} full page")

        # Test mobile responsiveness on index.html
        page.set_viewport_size({"width": 375, "height": 667})
        page.goto(f"file://{os.getcwd()}/index.html")
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{base_path}/index_mobile_full.png", full_page=True)
        print("Captured index_mobile_full.png")

        # Test menu opening on mobile
        page.click("#menu-open-button")
        page.wait_for_timeout(500)
        page.screenshot(path=f"{base_path}/index_mobile_menu.png")
        print("Captured index_mobile_menu.png")

        browser.close()

if __name__ == "__main__":
    capture_screenshots()
