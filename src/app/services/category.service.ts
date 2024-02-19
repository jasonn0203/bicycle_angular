import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../data-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  api: string = 'https://bicycle-angular.onrender.com';

  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get<Category[]>(`${this.api}/category`);
  }

  getCategoryById(id: number) {
    return this.http.get<Category>(`${this.api}/category/` + id);
  }

  addCategory(data: Category) {
    return this.http.post(`${this.api}/category/`, data);
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(
      `${this.api}/category/` + category.id,
      category
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.api}/category/` + id);
  }
}
