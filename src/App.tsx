import { useState } from 'react'
import wildMechsLogo from '/wild_mechs_text.jpeg'
import './App.css'
import banditDeck from './assets/bandit_deck.json'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'

function shuffleArray(array: string[][]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sumTableValues(deck: { table: { [key: string]: number|string|null }[] }) {
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
  const cards = shuffleArray(banditDeck.list);
  const [currentCard, setCurrentCard] = useState(cards[cardIndex]);
  const cycleCard = () => {
    const nextCardIndex = cardIndex + 1;
    if (nextCardIndex < banditDeck.cards.length) {
      setCardIndex(nextCardIndex);
      setCurrentCard(cards[nextCardIndex]);
    } else {
      setCurrentCard(["No more cards"]);
    }
  }
  const getCardsRemaining = () => {
    return banditDeck.cards.length - 1 - cardIndex;
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
          {currentCard.map(
            (element, index) => <Typography key={index} variant="body1">{element}</Typography>
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
