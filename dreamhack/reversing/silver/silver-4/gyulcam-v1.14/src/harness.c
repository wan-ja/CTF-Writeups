#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <dlfcn.h>

int main(int argc, char **argv) {
    void *h = dlopen("../src/_Gyul Cam v1.14.bin.extracted/squashfs-root/lib/libauth.so", RTLD_NOW);
    if (!h) { fprintf(stderr, "dlopen failed: %s\n", dlerror()); return 1; }

    void **ops = (void**)dlsym(h, "g_vfs_driver_ops");
    if (!ops) { fprintf(stderr, "dlsym failed: %s\n", dlerror()); return 1; }
    printf("g_vfs_driver_ops addr = %p, value(fn ptr) = %p\n", (void*)ops, *ops);

    typedef int (*fn_t)(const char*, size_t);
    fn_t fn = (fn_t)(*ops);

    char buf[100];
    memset(buf, 'A', 81);   // 81바이트짜리 아무 문자열
    buf[81] = 0;

    printf("Calling with 81 x 'A'...\n");
    fflush(stdout);
    int r = fn(buf, 81);
    printf("Result: %d\n", r);
    return 0;
}