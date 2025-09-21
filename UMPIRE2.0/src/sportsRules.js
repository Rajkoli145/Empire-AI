/**
 * Sports Rules Database
 * Contains rules and decision criteria for different sports
 */

const sportsRules = {
  cricket: {
    name: "Cricket",
    decisions: ["OUT", "NOT OUT", "WIDE", "NO BALL", "SIX", "FOUR"],
    rules: {
      bowled: "BATSMAN IS OUT if the ball hits the stumps directly from the bowler, OR if the ball hits the bat/pad first then hits the stumps. Look for: ball trajectory towards stumps, stumps being hit, bails falling off.",
      
      caught: "BATSMAN IS OUT if the ball touches the bat (even a slight edge) and is caught by ANY fielder (including wicket-keeper) before the ball touches the ground. Look for: ball deflection off bat, fielder catching cleanly, ball not bouncing first.",
      
      lbw: "BATSMAN IS OUT if: (1) Ball hits the pad/leg first (not bat first), (2) Ball would have hit the stumps (trajectory analysis), (3) Impact point is in line with stumps OR outside off-stump only if no shot was offered. Look for: ball hitting pad before bat, ball trajectory toward stumps.",
      
      stumped: "BATSMAN IS OUT if wicket-keeper breaks the stumps with the ball while the batsman is out of his crease AND not attempting a run (usually after missing the ball). Look for: batsman's foot outside crease line, keeper breaking stumps with ball, no run being attempted.",
      
      runOut: "BATSMAN IS OUT if fielder breaks the stumps with the ball while batsman is out of crease while attempting a run. Look for: batsman running, foot outside crease when stumps broken, direct hit or throw to keeper/fielder.",
      
      notOut: "BATSMAN IS NOT OUT if: ball misses stumps completely, ball hits ground before being caught, batsman's foot is inside the crease when stumps broken, ball hits bat first then pad (for LBW), or ball clearly missing stumps.",
      
      wide: "WIDE BALL if ball passes clearly outside batsman's normal reach on either side. Look for: ball trajectory well outside batsman's stance.",
      
      noBall: "NO BALL if: bowler's front foot completely crosses the popping crease (front line), ball bounces more than twice, ball is above waist height when reaching batsman, or more than 2 fielders behind square leg."
    },
    keyElements: ["ball trajectory", "bat contact", "stumps", "bails", "wicket-keeper", "fielders", "crease lines", "batsman position", "pad contact", "catching"],
    
    criticalPoints: [
      "For CAUGHT: Did ball definitely touch bat? Was it caught cleanly before bouncing?",
      "For BOWLED: Did ball hit the stumps and dislodge bails?",
      "For LBW: Did ball hit pad first? Would ball have hit stumps? Was impact in line?",
      "For STUMPED/RUN OUT: Was batsman's foot outside crease when stumps were broken?",
      "When in doubt between two decisions, choose based on clearest visual evidence."
    ]
  },
  
  football: {
    name: "Football/Soccer",
    decisions: ["GOAL", "NO GOAL", "OFFSIDE", "FOUL", "PENALTY", "CORNER", "THROW-IN"],
    rules: {
      goal: "Ball completely crosses goal line between goalposts and under crossbar",
      offside: "Player in offside position when ball played by teammate (except throw-ins, corners, goal kicks)",
      foul: "Kicking, tripping, jumping at, charging, striking, pushing, or holding opponent",
      penalty: "Direct free kick offense committed inside penalty area",
      handball: "Deliberately handling ball with hands/arms (except goalkeeper in penalty area)"
    },
    keyElements: ["ball", "goal", "goal line", "players", "goalkeeper", "penalty area", "offside line"]
  },
  
  tennis: {
    name: "Tennis",
    decisions: ["IN", "OUT", "FAULT", "ACE", "LET", "WINNER"],
    rules: {
      in: "Ball lands within the court boundaries",
      out: "Ball lands outside court boundaries or hits net",
      fault: "Serve that doesn't land in service box or hits net",
      let: "Serve that touches net but lands in correct service box",
      ace: "Serve that opponent cannot touch",
      winner: "Shot that opponent cannot return"
    },
    keyElements: ["ball", "court lines", "net", "service box", "player", "racket"]
  },
  
  basketball: {
    name: "Basketball",
    decisions: ["SCORE", "FOUL", "VIOLATION", "OUT OF BOUNDS", "SHOT CLOCK", "THREE POINTER"],
    rules: {
      score: "Ball goes through hoop from above",
      foul: "Illegal personal contact or unsportsmanlike conduct",
      traveling: "Moving with ball without dribbling",
      doubleRibble: "Dribbling with both hands or stopping and starting dribble",
      outOfBounds: "Ball or player touches boundary lines or goes outside court",
      threePointer: "Shot made from behind three-point line"
    },
    keyElements: ["ball", "hoop", "court lines", "three-point line", "players", "shot clock"]
  },
  
  general: {
    name: "General Sports",
    decisions: ["VALID", "INVALID", "FOUL", "LEGAL", "ILLEGAL"],
    rules: {
      general: "Analyze the sporting action based on visible elements and common sports principles",
      contact: "Determine if contact between players/objects is legal or illegal",
      boundary: "Check if ball/player is within bounds or out of bounds",
      scoring: "Determine if a scoring attempt is successful"
    },
    keyElements: ["ball", "players", "boundaries", "equipment", "playing surface"]
  }
};

/**
 * Get rules for a specific sport
 * @param {string} sport - Sport name
 * @returns {Object} Rules object for the sport
 */
function getRulesForSport(sport) {
  const sportKey = sport.toLowerCase();
  return sportsRules[sportKey] || sportsRules.general;
}

/**
 * Get all available sports
 * @returns {Array<string>} Array of sport names
 */
function getAvailableSports() {
  return Object.keys(sportsRules).filter(sport => sport !== 'general');
}

/**
 * Format rules as text for AI processing
 * @param {string} sport - Sport name
 * @returns {string} Formatted rules text
 */
function formatRulesForAI(sport) {
  const rules = getRulesForSport(sport);
  
  let rulesText = `Sport: ${rules.name}\n\n`;
  rulesText += `Possible Decisions: ${rules.decisions.join(', ')}\n\n`;
  rulesText += `Key Elements to Look For: ${rules.keyElements.join(', ')}\n\n`;
  rulesText += `Rules:\n`;
  
  Object.entries(rules.rules).forEach(([key, value]) => {
    rulesText += `- ${key.toUpperCase()}: ${value}\n`;
  });
  
  if (rules.criticalPoints) {
    rulesText += `\nCRITICAL DECISION POINTS:\n`;
    rules.criticalPoints.forEach(point => {
      rulesText += `• ${point}\n`;
    });
  }
  
  return rulesText;
}

module.exports = {
  sportsRules,
  getRulesForSport,
  getAvailableSports,
  formatRulesForAI
};