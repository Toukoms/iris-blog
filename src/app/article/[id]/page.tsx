"use client";
function EditArticlePage() {
  return (
    <div>
      <h2>Edit Article</h2>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="input" />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditArticlePage;
