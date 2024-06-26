import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useGlobalContext} from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}&page=1`;

const Gallery = () => {
  const {searchTerm} = useGlobalContext();
  console.log(searchTerm);

  // Add state value to array to trigger refetch
  const {isLoading, data, error} = useQuery({
    queryKey: ["images", searchTerm],

    queryFn: async () => {
      const {data} = await axios.get(`${url}&query=${searchTerm}`);
      return data;
    },
  });

  console.log(isLoading, data, error);
  if (isLoading) {
    return (
      <section className="image-container">
        <h4>Loading Images...</h4>
      </section>
    );
  }
  if (error) {
    return (
      <section className="image-container">
        <h4>There was an error loading the images</h4>
      </section>
    );
  }
  if (data.results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found..</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {data.results.map(item => {
        const url = item?.urls?.regular;
        return <img src={url} alt={item.alt_description} key={item.id} className="img" />;
      })}
    </section>
  );
};
export default Gallery;
