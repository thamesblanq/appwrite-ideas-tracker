import DataContext from "../context/DataContext";
import { useContext, useState } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { current: user, ideas, add, remove } = useContext(DataContext);
  //console.log(user);

  const addIdea = async (title, description) => {
    try{
      await add({ userId: user.$id, title, description })
      setDescription('');
      setTitle('');
    } catch(err){
      console.log(`Error adding idea: ${err.message}`);
      setDescription(description);
      setTitle(title);
    }
  }

  const removeIdea = async (idea) => {
    try{
      await remove(idea.$id);
    } catch(err){
      console.log(`Error deleting idea: ${err.message}`);
    }
  }

  return (
    <div className="my-2 px-4 h-[100vh]">

      <>
            {/* Show the submit form to logged in users. */}
            {user ? (
              <section className="flex flex-col gap-4">
                <h2>Submit Idea</h2>
                <form className="flex flex-col items-start justify-center gap-y-8 gap-x-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="border border-black py-2 px-4 outline-none italic font-semibold"
                  />
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="border border-black py-2 px-4 outline-none italic text-xs w-[70%] h-[30vh]"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      addIdea(title, description)
                    }
                    className="rounded-lg bg-purple-700 text-white py-2 px-6 outline-none font-bold text-xs md:text-sm"
                  >
                    Submit
                  </button>
                </form>
              </section>
            ) : (
              <section>
                <p>Please login to submit an idea.</p>
              </section>
            )}
            <section>
              {ideas.length !== 0 ? (
                <>
                  <h2>Latest Ideas</h2>
                    <ul>
                    {ideas.map((idea) => (
                      <li key={idea.$id}>
                        <strong>{idea.title}</strong>
                        <p>{idea.description}</p>
                        {/* Show the remove button to idea owner. */}
                        {user && user.$id === idea.userId && (
                          <button type="button" onClick={() => removeIdea(idea)}
                          className="rounded-lg bg-red-700 text-white py-2 px-6 outline-none font-bold text-xs md:text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No ideas to show</p>
              ) }
            </section>
          </>
    </div>
  )
}

export default Home