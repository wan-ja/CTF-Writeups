h = "e6b9ef51a73a7e1aee6e95d89ba12208"
data = [h[i:i+2] for i in range(0, len(h), 2)]
print(",".join(f"0x{i}" for i in data))