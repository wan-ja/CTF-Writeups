from pwn import *

r = remote('host8.dreamhack.games', 20555)

def move(start, end):
    r.recvuntil(b'> ')
    cmd = f"{start}{end}".encode()
    r.sendline(cmd)

def hanoi(n, start, end, aux):
    if n == 1:
        move(start, end)
        return
    hanoi(n - 1, start, aux, end)
    move(start, end)
    hanoi(n - 1, aux, end, start)

# [초기 상태] 1번 기둥: [5,4,3,2,1] / 2번 기둥: [7] / 3번 기둥: [6]
hanoi(5, 1, 2, 3)  
move(3, 1)         

hanoi(5, 2, 1, 3)  
move(2, 3)         

hanoi(5, 1, 2, 3)  
move(1, 3)         

hanoi(5, 2, 3, 1)  

r.interactive()