import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
  }

}
