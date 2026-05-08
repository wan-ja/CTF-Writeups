import hashlib
import base64

def bytes_to_long(a):
    return int.from_bytes(a, byteorder='big')
def long_to_bytes(a):
    return a.to_bytes((a.bit_length()+7)//8, byteorder='big')

print(long_to_bytes(548488142063681088110499188198346596132432266189304030893626^bytes_to_long(base64.b64encode(hashlib.sha256(input().rstrip().encode('utf-8')).digest())[13:36])))