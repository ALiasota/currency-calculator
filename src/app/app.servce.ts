@Injectable({ providedIn: 'root' })
export class AccountsHttpService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable {
    return this.http.get('/api/users')
  }
}