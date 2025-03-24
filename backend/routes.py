from flask import request, jsonify, send_from_directory
from config import app, db
from models import Contact
import os

# GET ALL CONTACTS
@app.route("/api/contacts", methods = ["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

# CREATE CONTACT
@app.route("/api/contacts", methods = ["POST"])
def create_contact():
    
    if request.json == None:
        return jsonify({"error":"Missing JSON"}), 400
    
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    notes = request.json.get("notes")
    img_url = request.json.get("imgUrl")

    if not first_name or not last_name:
        return jsonify({"error": "You must include a first name and a last name"}), 400
    
    if not email:
        email = None

    if not notes:
        notes = ""

    # Fetch contact image
    if not img_url:
        img_url = f"https://avatar.iran.liara.run/username?username={first_name}+{last_name}"

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, notes=notes, img_url=img_url)

    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    return jsonify(new_contact.to_json()), 201

# UPDATE CONTACT
@app.route("/api/contacts/<int:user_id>", methods = ["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"error":"User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.notes = data.get("notes", contact.notes)
    contact.img_url = data.get("imgUrl", contact.img_url)

    db.session.commit()
    
    return jsonify(contact.to_json()), 201

# DELETE CONTACT
@app.route("/api/contacts/<int:user_id>", methods = ["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"error":"User not found"}), 404
    
    try:
        db.session.delete(contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User deleted!"}), 201


frontend_folder = os.path.join(os.getcwd(), "..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder

@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(dist_folder, filename)

if __name__ == "__main__":
    
    with app.app_context():
        db.create_all()

    app.run(debug = True)