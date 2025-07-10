//Encryption.ts 

//Se crea la función para la incriptación del password y el nombre
const encryptData = async (data: string): Promise<string> => {
    const keyHex = import.meta.env.VITE_AES_PRIVATE_KEY;
    if (!keyHex) throw new Error("La clave de cifrado no está configurada.");

    // Convertir la clave en hexadecimal a un Uint8Array
    const keyBuffer = new Uint8Array(keyHex.match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16)));

    const iv = crypto.getRandomValues(new Uint8Array(12)); 
    // IV de 12 bytes para AES-GCM
    const encodedData = new TextEncoder().encode(data);

    // Importar la clave para encriptación
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBuffer,
        'AES-GCM',
        false,
        ['encrypt']
    );

    // Encriptar los datos
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        cryptoKey,
        encodedData
    );

    // Convertir Uint8Array a cadena hexadecimal
    const toHexString = (bytes: Uint8Array) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const encryptedHex = toHexString(new Uint8Array(encrypted));
    const ivHex = toHexString(iv);

    return `${ivHex}:${encryptedHex}`; 
    // Retornamos IV y datos encriptados separados por ":"
};

export { encryptData }
