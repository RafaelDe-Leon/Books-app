import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  loginUser: function(user) {
    return axios.post("/api/user/", user, {
      headers: { xhrFields: {
        withCredentials: true
      }
    }})
  },
  signup: function(user) {
    return axios.post("/api/user/signup", user, {
      headers: { xhrFields: {
        withCredentials: true
      }
    }})
  },
  authenticateUser: function() {
    console.log('auth');
    return axios.post("/api/user/authenticate/", {
      headers: { xhrFields: {
        withCredentials: true
      }
    }})
  }
  
};
