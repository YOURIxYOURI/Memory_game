namespace MemoryGame_API.Models
{
    public class Score
    {
        public int Id { get; set; }
        public int Points {  get; set; }
        public int Moves { get; set; }
        public virtual User User { get; set; }

    }
}
