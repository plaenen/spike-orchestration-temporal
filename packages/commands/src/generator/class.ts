export class CreateProductV1 {
    @Length(10, 20)
    title: string;
  
    @Contains('hello')
    text: string;
  
    @IsInt()
    @Min(0)
    @Max(10)
    rating: number;
  
    @IsEmail()
    email: string;
  
    @IsFQDN()
    site: string;
  
    @IsDate()
    createDate: Date;
  }