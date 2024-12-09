import Image from "next/image";

const ProductGallery = () => {
  return (
    <div className="flex-1">
      <Image
        src="https://utfs.io/f/wLDjZbdcJHpRoki5D1i4gjP2ZxK0UVnc8t5aqFdYEuWh947M"
        alt="Product"
        height={120}
        width={120}
        className="mb-4 w-full rounded-xl"
      />

      <div className="flex gap-2">
        <Image
          src="https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7fs"
          alt="Product"
          height={64}
          width={64}
        />
        <Image
          src="https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7fs"
          alt="Product"
          height={64}
          width={64}
        />
        <Image
          src="https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7fs"
          alt="Product"
          height={64}
          width={64}
        />
        <Image
          src="https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7fs"
          alt="Product"
          height={64}
          width={64}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
