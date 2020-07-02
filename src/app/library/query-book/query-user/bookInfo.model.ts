export class BookInfo {
    bookId: string;
    authorName: string;
    educationName: string;
    bookName: string;
    quantity: number;
    bookImg: string;

    setBookId(bookId: string): string {
        return this.bookId = bookId;
    }

    getBookId(): string {
        return this.bookId;
    }

    setAuthorName(authorName: string): string {
        return this.authorName = authorName;
    }

    getAuthorName(): string {
        return this.authorName;
    }

    setEducationName(educationName: string): string {
        return this.educationName = educationName;
    }

    getEducationName(): string {
        return this.educationName;
    }

    setBookName(bookName: string): string {
        return this.bookName = bookName;
    }

    getBookName(): string {
        return this.bookName;
    }

    setQuantity(quantity: number): number {
        return this.quantity = quantity;
    }

    getQuantity(): number {
        return this.quantity;
    }

    setBookImg(bookImg: string): string {
        return this.bookImg = bookImg;
    }

    getBookImg(): string {
        return this.bookImg;
    }

}