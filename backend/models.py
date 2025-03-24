from config import db

class Contact(db.Model):

    id = db.Column(db.Integer, primary_key = True)
    first_name = db.Column(db.String(80), unique = False, nullable = False)
    last_name = db.Column(db.String(80), unique = False, nullable = False)
    email = db.Column(db.String(120), unique = False, nullable = True)
    notes = db.Column(db.String(250), unique = False, nullable = True)
    img_url = db.Column(db.String(250), unique = False, nullable = True)
        
    def to_json(self):
        
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "notes": self.notes,
            "imgUrl": self.img_url
        }