import { Topic } from "../../types/topics";

interface PostFilterBarProps {
  setSearchTerm: (value: string) => void;
  allTopics: Topic[];
  setSelectedTopic: (value: string) => void;
}

export const PostFilterBar = ({
  setSearchTerm,
  allTopics,
  setSelectedTopic,
}: PostFilterBarProps) => {
  return (
    <div className="filter-bar">
      <select
        onChange={(event) => setSelectedTopic(event.target.value)}
        className="topic-dropdown"
      >
        <option value="">Select A Topic</option>
        {allTopics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.name}
          </option>
        ))}
      </select>
      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Posts"
        className="post-search"
      />
    </div>
  );
};
