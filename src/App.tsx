import { useState } from 'react'
import wildMechsLogo from '/wild_mechs_text.jpeg'
import './App.css'
import banditDeck from './assets/bandit_deck.json'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'

function App() {
  const [cardIndex, setCardIndex] = useState(0)
  const [currentCard, setCurrentCard] = useState(banditDeck.cards[cardIndex]);
  const cycleCard = () => {
    const nextCardIndex = cardIndex + 1;
    if (nextCardIndex < banditDeck.cards.length) {
      setCardIndex(nextCardIndex);
      setCurrentCard(banditDeck.cards[nextCardIndex]);
    } else {
      setCurrentCard("No more cards");
    }
  }
  const getCardsRemaining = () => {
    return banditDeck.cards.length - 1 - cardIndex;
  }

  return (
    <Container>
      <Box component="img"
        src={wildMechsLogo}
        sx={{width:233}} />
      <Typography variant="h2">Bandit Deck</Typography>
      <Typography variant="h3">Cards Remaining: {getCardsRemaining()}</Typography>
      <Card>
        <CardContent><Typography variant="body1">{currentCard}</Typography></CardContent>
        <button disabled={!getCardsRemaining()} onClick={cycleCard}>Draw Card</button>
      </Card>
    </Container>
  )
}

export default App
