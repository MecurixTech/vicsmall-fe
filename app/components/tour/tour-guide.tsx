"use client"
import Joyride from "react-joyride-react-19"
import { useTour } from "@/context/tour-context"

export function TourGuide() {
  const { isRunning, stepIndex, steps, handleJoyrideCallback, isAuthenticated } = useTour()

  if (!isAuthenticated) return null

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={isRunning}
      scrollToFirstStep
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      steps={steps}
      disableOverlayClose
      spotlightClicks
      floaterProps={{
        disableAnimation: false,
        styles: {
          floater: {
            filter: "drop-shadow(0px 8px 20px rgba(0, 0, 0, 0.2))",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          },
        },
      }}
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          overlayColor: "rgba(0, 0, 0, 0.75)",
          primaryColor: "#FF8C48",
          textColor: "#333",
          zIndex: 9999,
          beaconSize: 40,
        },
        spotlight: {
          backgroundColor: "transparent",
          borderRadius: 20,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
          transition: "all 0.5s ease-in-out",
        },
        tooltipContainer: {
          textAlign: "left",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          padding: "20px",
          maxWidth: "350px",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        },
        tooltipTitle: {
          fontSize: "20px",
          fontWeight: "bold",
          margin: "0 0 12px 0",
          color: "#333",
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: "10px",
        },
        tooltipContent: {
          fontSize: "15px",
          lineHeight: "1.6",
          color: "#555",
          margin: "0 0 20px 0",
        },
        buttonNext: {
          backgroundColor: "#FF8C48",
          color: "#fff",
          padding: "10px 18px",
          fontSize: "15px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "none",
          boxShadow: "0 4px 10px rgba(255, 140, 72, 0.3)",
          transition: "all 0.3s ease",
          cursor: "pointer",
        },
        buttonBack: {
          marginRight: 15,
          color: "#666",
          padding: "10px 18px",
          fontSize: "15px",
          fontWeight: "600",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "white",
          transition: "all 0.3s ease",
          cursor: "pointer",
        },
        buttonSkip: {
          color: "#888",
          fontSize: "14px",
          fontWeight: "500",
          textDecoration: "underline",
          transition: "color 0.3s ease",
          marginRight: "15px",
        },
        buttonClose: {
          color: "#FF8C48",
          transition: "color 0.3s ease",
        },
      }}
      locale={{
        back: "Previous",
        close: "Close",
        last: "Finish",
        next: "Next",
        skip: "Skip Tour",
      }}
    />
  )
}

