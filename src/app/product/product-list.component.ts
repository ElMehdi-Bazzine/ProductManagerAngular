import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl : './product-list.component.html',
  styleUrls : ['./product-list.component.css']})

export class ProductListComponent implements OnInit, OnDestroy{

  pageTitle : string = 'Products list';
  imageWidth : number =50;
  imageMargin =2;
  showImage = false;

  private _listFilter = '';
  filteredProducts : IProduct[] = [];

  errorMessage : string = '';
  sub!: Subscription;

  constructor(private productService : ProductService) { }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value:string) {
    this._listFilter = value;
    console.log('In Setter :', value);
    this.filteredProducts = this.performFilter(value);
  }
  products : IProduct[] = [];

  performFilter(filterBy: string): IProduct[] {
    filterBy = this.listFilter.toLocaleLowerCase();
    return this.products.filter((product : IProduct)=>
    product.productName.toLocaleLowerCase().includes(filterBy));
  }

  toggleImage() : void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Products List : ' + message;
  }

  ngOnInit(): void {
    this .sub = this.productService.getProducts().subscribe({
      next : products => {
        this.products = products,
        this.filteredProducts = this.products
      },
      error : err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
