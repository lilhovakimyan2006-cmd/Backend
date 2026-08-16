const buffer = Buffer.alloc(10);

buffer.write("Hello");

for (let i = 0; i < buffer.length; ++i) {
    let newByte;

    if (buffer[i] >= 97 && buffer[i] <= 122) {
        newByte = ((buffer[i] - 97 + 3) % 26 + 26) % 26 + 97;
    }

    if (buffer[i] >= 65 && buffer[i] <= 90) {
        newByte = ((buffer[i] - 65 + 3) % 26 + 26) % 26 + 65;
    }

    buffer[i] = newByte;
}

const text = buffer.toString();

console.log(text);