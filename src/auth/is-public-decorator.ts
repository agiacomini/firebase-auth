import { SetMetadata } from '@nestjs/common';

// Export two constants. One being our metadata key named "IS_PUBLIC_KEY", and the other being our new
// decorator itself that we're going to call "Public".
export const IS_PUBLIC_KEY = 'isPublic';

// Creating a custom decorator using the "SetMetadata()" decorator factory function
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
