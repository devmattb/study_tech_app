/**
*
*   calcNumStudySessions():
*   Calculates the number of study sessions we need to schedule this student for.
*
*   Use static table for Muntligt/Glosor, defined below:
*         Muntligt = 5/3/3/2 sessions max, both. MaxGym/NormGym/Max9-6/Norm9-6
*         Glosor = 3/2/2/2 sessions max, both. MaxGym/NormGym/Max9-6/Norm9-6
*
*   For any Other examinationType, use our tables defined in docs, with a dynamic study scope adjustment.
*
*   TODO: Ta hänsyn till omfattning på muntlig redovisning?
*   TODO: Ta hänsyn till kurstyp?
*   @param examinationType Muntlig Redovisning, Glosor or Other
*   @param ambitionLevel is Normal or Ambitiös.
*   @param schoolGrade is true if 6-9, false if "Gymnasiet"
*   @param studyScopeLevel is Low, Medium or High.
*   @param numAvailableDays is the number of days until the deadline is reached.
*   @return numStudySessions variable, determing the number of study sessions we need.
*
**/
export function calcNumStudySessions( examinationType, ambitionLevel, schoolGrade, studyScopeLevel, numAvailableDays ) {

  var numStudySessions;
  // numStudySessions needs to be calculated
  if ( examinationType !=  "Muntlig Redovisning" && examinationType != "Glosor" ) {

      if ( schoolGrade == "Gymnasiet" && ambitionLevel == "Ambitiös" ) {
      // Gymnasiet, Ambitiös, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 18;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 14;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
          numStudySessions = 12;
        } else if ( numAvailableDays < 5 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "Gymnasiet" && ambitionLevel == "Normal" ) {
      // Gymnasiet, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 14;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
          numStudySessions = 9;
        } else if ( numAvailableDays < 5 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "8or9" && ambitionLevel == "Ambitiös" ) {
      // 9-8, Ambitiös, Other

      // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
      if ( numAvailableDays > 14 ) {
        numStudySessions = 14;
      } else if ( numAvailableDays > 9 ) {
        numStudySessions = 10;
      } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
        numStudySessions = 9;
      } else if ( numAvailableDays < 5 ) {
        numStudySessions = numAvailableDays * 2;
      }

    } else if ( schoolGrade == "8or9" && ambitionLevel == "Normal" ) {
      // 9-8, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 7;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "6or7" && ambitionLevel == "Ambitiös" ) {
      // 7-6, Ambitiös, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 7;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "6or7" && ambitionLevel == "Normal" ) {
      // 7-6, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 8;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 6;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      }

      // STUDY SCOPE ADJUSTER. If the studyScopeLevel is not high, lower the amount of study sessions.
      if ( studyScopeLevel == "Medium" ) {
        numStudySessions = Math.round(numStudySessions * 0.7);
      } else if ( studyScopeLevel == "Low" ) {
        numStudySessions = Math.round(numStudySessions * 0.5);
      }

  // numStudySessions needs to be picked out from our static table of numbers.
  } else {

      if ( schoolGrade == "Gymnasiet") {
        // School grade is Gymnasiet.
        if ( ambitionLevel == "Ambitiös" ) {
          if ( examinationType == "Muntlig Redovisning" ) {
            // Gymnasiet, Ambitiös, Muntlig
            numStudySessions = 5;
          } else {
            // Gymnasiet, Ambitiös, Glosor
            numStudySessions = 3;
          }
        } else {
          // Ambition level is Normal
          if ( examinationType == "Muntlig Redovisning" ) {
            // Gymnasiet, Normal, Muntlig
            numStudySessions = 3;
          } else {
            // Gymnasiet, Normal, Glosor
            numStudySessions = 2;
          }
        }

      } else {
        // School grade is not gymnasiet.
        if ( ambitionLevel == "Ambitiös" ) {
          if ( examinationType == "Muntlig Redovisning" ) {
            // NOT-Gymnasiet, Ambitiös, Muntlig
            numStudySessions = 3;
          } else {
            // NOT-Gymnasiet, Ambitiös, Glosor
            numStudySessions = 2;
          }

        } else {
          // Ambition level is Normal
          if ( examinationType == "Muntlig Redovisning" ) {
            // NOT-Gymnasiet, Normal, Muntlig
            numStudySessions = 2;
          } else {
            // NOT-Gymnasiet, Normal, Glosor
            numStudySessions = 2;
          }
        }

      }
  }
  // RETURN OUR CALCULATED numStudySessions !
  return numStudySessions;
}
