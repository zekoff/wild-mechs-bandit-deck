import { useEffect, useState } from 'react'
import wildMechsLogo from '/wild_mechs_text.jpeg'
import './App.css'
import banditDeck from './assets/bandit_deck.json'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'

function shuffleArray(array: {}[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sumTableValues(deck: { table: { [key: string]: number | string | null }[] }) {
  const sums: { [key: string]: number } = {};
  deck.table.forEach(row => {
    for (const key in row) {
      if (row.hasOwnProperty(key) && typeof row[key] === 'number') {
        if (!sums[key]) {
          sums[key] = 0;
        }
        sums[key] += row[key] as number;
      }
    }
  });
  return sums;
}

function App() {
  const [cardIndex, setCardIndex] = useState(0);
  const [cards, setCards] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState(null);
  useEffect(() => {
    setCards(shuffleArray(banditDeck.table));
  }, []);
  useEffect(() => {
    if (cards.length > 0) setCurrentCard(cards[cardIndex]);
  }, [cardIndex, cards]);
  const cycleCard = () => {
    const nextCardIndex = cardIndex + 1;
    console.log(nextCardIndex);
    if (nextCardIndex < cards.length) {
      setCardIndex(nextCardIndex);
      setCurrentCard(cards[nextCardIndex]);
      console.log(cards[nextCardIndex]);
    }
  }
  const getCardsRemaining = () => {
    return banditDeck.table.length - 1 - cardIndex;
  }

  return (
    <Container>
      <Box component="img"
        src={wildMechsLogo}
        sx={{ width: 233 }} />
      <Typography variant="h2">Bandit Deck</Typography>
      <Typography variant="h3">Cards Remaining: {getCardsRemaining()}</Typography>
      <Card>
        <CardContent>
          {currentCard && Object.entries(currentCard).map(
            ([key, value]) => {
              if (!value) return null;
              if (key === 'Gold') return <Typography key={key} variant="body1">Gold to {value as string}</Typography>;
              if (key === 'Extra') return <Typography key={key} variant="body1">Event: {value as string}</Typography>;
              return <Typography key={key} variant="body1">{value as string} to {key}</Typography>;
            }
          )}
        </CardContent>
        <button disabled={!getCardsRemaining()} onClick={cycleCard}>Draw Card</button>
      </Card>
      <Box>
        <Typography variant="h4">Table Sums:</Typography>
        {Object.entries(sumTableValues(banditDeck)).map(([key, value]) => (
          <Typography key={key} variant="body1">{`${key}: ${value}`}</Typography>
        ))}
        <Typography variant="h5">
          Total Sum: {Object.values(sumTableValues(banditDeck)).reduce((acc, value) => acc + value, 0)}
        </Typography>
      </Box>
    </Container>
  )
}

export default App
