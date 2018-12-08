import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '子标题',
    en: '英文标题',
    pic: '/assets/img/quotes/quote_fallback.jpg',
  };

  constructor(private fb: FormBuilder,
              private quoteService$: QuoteService
  ) {
    this.quoteService$.getQuote().subscribe(q => this.quote = q);
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['mengjian@163.com', Validators.compose([
          Validators.required,
          Validators.email,
          this.validate
        ])
      ],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(valid));
  }

  validate(fc: FormControl): {[key: string]: any} {
    if (!fc.valid) {
      return null;
    }
    const pattern = /^meng+/;
    if (pattern.test(fc.value)) {
      return null;
    }
    return {emailNotValid: 'Email must start with meng'};
  }

}
