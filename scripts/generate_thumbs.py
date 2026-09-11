import os
import subprocess
import tempfile
import shutil
import time
from PIL import Image

PAGES = [
    ("thumb-01.webp", "http://localhost:8000/giac-quan/"),
    ("thumb-02.webp", "http://localhost:8000/giac-quan/hieu-giac-quan.html"),
    ("thumb-03.webp", "http://localhost:8000/giac-quan/tu-dieu-hoa-den-qua-tai.html"),
    ("thumb-04.webp", "http://localhost:8000/giac-quan/khi-qua-tai-thanh-hanh-vi.html"),
    ("thumb-05.webp", "http://localhost:8000/giac-quan/ban-do-cac-he-giac-quan.html"),
    ("thumb-06.webp", "http://localhost:8000/giac-quan/phan-ung-voi-cam-giac.html"),
    ("thumb-07.webp", "http://localhost:8000/giac-quan/giac-quan-khong-tach-biet.html"),
    ("thumb-08.webp", "http://localhost:8000/giac-quan/ba-me-quan-sat-con.html"),
    ("thumb-09.webp", "http://localhost:8000/giac-quan/ho-tro-tre-kho-dieu-hoa.html"),
    ("thumb-10.webp", "http://localhost:8000/giac-quan/khi-nao-nhin-xa-hon.html"),
    ("thumb-11.webp", "http://localhost:8000/giac-quan/bo-cong-cu.html"),
    ("thumb-12.webp", "http://localhost:8000/giac-quan/cau-hoi-thuong-gap.html"),
    ("thumb-13.webp", "http://localhost:8000/giac-quan/hieu-con-truoc-khi-thay-doi.html"),
    ("thumb-14.webp", "http://localhost:8000/giac-quan/acknowledgments.html")
]

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img", "thumbs")
os.makedirs(OUT_DIR, exist_ok=True)

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

def capture_page(filename, url):
    print(f"Capturing {filename} from {url}...")
    tmp = tempfile.mkdtemp()
    raw_png = os.path.join(tmp, "raw.png")
    out_webp = os.path.join(OUT_DIR, filename)
    
    cmd = [
        CHROME,
        "--headless",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={tmp}",
        "--window-size=1200,900",
        f"--screenshot={raw_png}",
        url
    ]
    
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(40):
        time.sleep(0.1)
        if os.path.exists(raw_png) and os.path.getsize(raw_png) > 10000:
            break
            
    proc.kill()
    proc.wait()
    
    if os.path.exists(raw_png):
        with Image.open(raw_png) as im:
            # Resize from 1200x900 to 600x450 (exact 4:3 aspect ratio)
            im_resized = im.resize((600, 450), Image.Resampling.LANCZOS)
            im_resized.save(out_webp, "WEBP", quality=85)
        print(f" -> Saved {out_webp} ({os.path.getsize(out_webp)} bytes)")
    else:
        print(f" -> FAILED to capture {url}")
        
    shutil.rmtree(tmp, ignore_errors=True)

def main():
    start = time.time()
    for fname, url in PAGES:
        capture_page(fname, url)
    print(f"All done in {time.time() - start:.2f} seconds.")

if __name__ == "__main__":
    main()
