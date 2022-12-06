export default class AuthService {

    constructor(http) {
      this.http = http;
    }
    async signUp(myPlace, phoneNumber,image, nickName) {
      return this.http.fetch('/auth/signUp', {
        method: 'POST',
        body: JSON.stringify({myPlace, phoneNumber,image, nickName })
      });
    }
    async login(phoneNumber) {
      return this.http.fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber})
      });
    }
  
    async me() {
      return this.http.fetch('/auth/me', {
        method: 'GET',
      });
    }
  
    async logout() {
      return this.http.fetch('/auth/logout', {
        method: 'POST',
      });
    }
  
    async update(updateData) {
      return this.http.fetch('/auth/update',{
        method: 'PUT',
        body : JSON.stringify({updateData})
      })
    }

    async csrfToken(){
      const resp = await this.http.fetch('/auth/csrf-token',{
        method: 'GET',
      });
      console.log(resp.csrfToken);
      return resp.csrfToken;
    }

    async sendSMSCode(phoneNumber){
      return this.http.fetch('/auth/sendSMSCode', {
        method: 'POST',
        body: JSON.stringify({ number:phoneNumber})
      });
    }

    
    async verifySMSCode(code,to){
      return this.http.fetch('/auth/verifySMSCode', {
        method: 'POST',
        body: JSON.stringify({code,to})
      });
    }
    
    async getCurrentJobPostLikeStatus(jobPostId){
      return this.http.fetch(`/auth/getCurrentJobPostLikeStatus/?jobPostId=${jobPostId}`,{
        method: 'GET'
      })
    }

    async updateJobPostLike(jobPost){
      return this.http.fetch('/auth/updateJobPostLike',{
        method: 'POST',
        body : JSON.stringify({jobPost})
      })
    }

    async getLikedList(){
      return this.http.fetch('/auth/getLikedList',{
        method: 'GET'
      })
    }
  }
  