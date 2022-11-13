from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required,current_user
from app.models import Note, Task, User, db
from ..forms.note_form import NewNote


note_routes = Blueprint('notes', __name__)

@note_routes.route('/')
def get_all_notes():
  notes = Note.query.all()
  return {"notes": [note.to_dict() for note in notes]}


@note_routes.route("/new_note", methods=["GET","POST"])
def post_note():
  if current_user.is_authenticated:
      form = NewNote()
      form['csrf_token'].data = request.cookies['csrf_token']
      if form.validate_on_submit():
          note = Note(
              body= form.data["body"],

              )
          db.session.add(note)
          db.session.commit()
      return render_template('note_form.html', form=form)
  else: return '<h1>loser</h1>'



@note_routes.route("/<int:id>")
def single_note(id):
  note = Note.query.get(id)
  return note.to_dict()


@note_routes.route("/<int:id>", methods=["DELETE"])
def del_note(id):
  if current_user.is_authenticated:
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return "bomboclat"
  else:
    return "UNAUTHORIZED"



@note_routes.route("/<int:id>/edit", methods=["GET"])
def edit_note_form(id):
  print("THIS IS THE THING FIRING")
  new_note = Note.query.get(id)
  form = NewNote()
  form['csrf_token'].data = request.cookies['csrf_token']

  return render_template("edit_note.html", form=form, note=new_note)


@note_routes.route("/<int:id>/edit", methods=["PUT"])
def edit_note(id):
  new_note = Note.query.get(id)
  form = NewNote()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_note.body = form.data["body"]

    db.session.commit()
    return redirect(f"/api/all/notes//{id}")
  return render_template("edit_note.html", form=form, note=new_note)
