def operational_risk_score(inbound_delay, scheduled_turn, congestion, weather, atc, maintenance, crew, remaining_legs):
    score = (
        min(inbound_delay, 90) / 90 * 30
        + max(0, 50 - scheduled_turn) / 20 * 18
        + congestion * 18
        + weather * 13
        + atc * 11
        + maintenance * 9
        + crew * 7
        + min(remaining_legs, 4) / 4 * 12
    )
    return max(0, min(100, round(score)))
