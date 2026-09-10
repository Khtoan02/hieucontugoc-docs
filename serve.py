#!/usr/bin/env python3
"""
Server tĩnh chạy local hỗ trợ Clean URLs (tự nhận file .html khi bỏ đuôi .html)
Dùng: python3 serve.py [port]
Mặc định port 8000.
"""
import http.server
import socketserver
import os
import sys

PORT = 8000

class CleanHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        translated = super().translate_path(path)
        if not os.path.exists(translated) and os.path.exists(translated + '.html'):
            return translated + '.html'
        return translated

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), CleanHandler) as httpd:
        print(f"Local server đang chạy tại: http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐã dừng server.")
