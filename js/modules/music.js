define(function(){
    var MUSIC_UTILS = {
        getChromaticScale: function(key) {
            var scaleNotes = [];
            for(var i = 0; i < this.C_CHROMATIC_SCALE_NOTES.length; i++){
                var index = this.C_CHROMATIC_SCALE_NOTES.indexOf(key) + i;
                if(!(index < this.C_CHROMATIC_SCALE_NOTES.length)) {
                    index = index - 12;
                }
                scaleNotes.push(this.C_CHROMATIC_SCALE_NOTES[index]);
            }
            return scaleNotes;
        },
        getScaleNotesFromBaseIntervals: function(key, scaleType) {
            var chromaticScale = this.getChromaticScale(key);
            var majorScaleIntervals = this.BASE_SCALE_INTERVALS[scaleType];
            if(majorScaleIntervals) {
                var scaleNotes = [];
                for (var i = 0; i < majorScaleIntervals.length; i++) {
                    scaleNotes.push(chromaticScale[majorScaleIntervals[i]]);
                }
                return scaleNotes;
            }
            return null;
        },
        getScaleNotes: function(key, scaleType) {
            var retVal = null;
            if(this.BASE_SCALE_INTERVALS.hasOwnProperty(scaleType)) {
                retVal = this.getScaleNotesFromBaseIntervals(key, scaleType);
            } else if(this.MODAL_SCALES.hasOwnProperty(scaleType)) {
                retVal = this.getModalScaleNotes(key, MUSIC_UTILS.MODAL_SCALES[scaleType]);
            }
            return retVal;
        },
        getModalScaleNotes: function(key, mode) {
            function findMajorScaleRoot(key, mode) {
                var semitonesFromModalKeyToMajorScale = {
                    IONIAN: 0,
                    DORIAN: 2,
                    PHRYGIAN: 4,
                    LYDIAN: 5,
                    MIXOLYDIAN: 7,
                    AEOLIAN: 9,
                    LOCRIAN: 10
                };
                var semitonesToBacktrack = semitonesFromModalKeyToMajorScale[mode];
                if(semitonesToBacktrack === 0) {
                    return key;
                } else {
                    var chromaticScaleForKey = MUSIC_UTILS.getChromaticScale(key);
                    return chromaticScaleForKey[chromaticScaleForKey.length - semitonesToBacktrack];
                }
            }

            // find out which major scale to use
            var majorScaleRoot = findMajorScaleRoot(key, mode);

            // get major scale
            var majorScale = MUSIC_UTILS.getScaleNotesFromBaseIntervals(majorScaleRoot, "MAJOR");

            // rotate major scale to start at key
            var indexOfKey = majorScale.indexOf(key);
            return majorScale.splice(indexOfKey, majorScale.length).concat(majorScale.splice(0, indexOfKey));
        },
        getKeyByValue: function(obj, value) {
            for(prop in obj) {
                if(obj.hasOwnProperty(prop)) {
                    if(obj[prop] === value) {
                        return prop;
                    }
                }
            }
            return null;
        }
    };

    MUSIC_UTILS.NOTES = {
        C: "C",
        C_SHARP: "C#",
        D: "D",
        D_SHARP: "D#",
        E: "E",
        F: "F",
        F_SHARP: "F#",
        G: "G",
        G_SHARP: "G#",
        A: "A",
        A_SHARP: "A#",
        B: "B"
    };

    MUSIC_UTILS.C_CHROMATIC_SCALE_NOTES = [
        MUSIC_UTILS.NOTES.C,
        MUSIC_UTILS.NOTES.C_SHARP,
        MUSIC_UTILS.NOTES.D,
        MUSIC_UTILS.NOTES.D_SHARP,
        MUSIC_UTILS.NOTES.E,
        MUSIC_UTILS.NOTES.F,
        MUSIC_UTILS.NOTES.F_SHARP,
        MUSIC_UTILS.NOTES.G,
        MUSIC_UTILS.NOTES.G_SHARP,
        MUSIC_UTILS.NOTES.A,
        MUSIC_UTILS.NOTES.A_SHARP,
        MUSIC_UTILS.NOTES.B
    ];

    MUSIC_UTILS.INTERVALS = {
        UNISON: 0,
        MINOR_SECOND: 1,
        MAJOR_SECOND: 2,
        MINOR_THIRD: 3,
        MAJOR_THIRD: 4,
        PERFECT_FORTH: 5,
        AUGMENTED_FORTH: 6,
        PERFECT_FIFTH: 7,
        MINOR_SIXTH: 8,
        MAJOR_SIXTH: 9,
        MINOR_SEVENTH: 10,
        MAJOR_SEVENTH: 11,
        OCTAVE: 12
    };

    MUSIC_UTILS.MODAL_SCALES = {
        MAJOR: "IONIAN",
        NATURAL_MINOR: "AEOLIAN",
        IONIAN: "IONIAN",
        DORIAN: "DORIAN",
        PHRYGIAN: "PHRYGIAN",
        LYDIAN: "LYDIAN",
        MIXOLYDIAN: "MIXOLYDIAN",
        AEOLIAN: "AEOLIAN",
        LOCRIAN: "LOCRIAN"
    };

    MUSIC_UTILS.BASE_SCALE_INTERVALS = {
        MAJOR: [MUSIC_UTILS.INTERVALS.UNISON,
            MUSIC_UTILS.INTERVALS.MAJOR_SECOND,
            MUSIC_UTILS.INTERVALS.MAJOR_THIRD,
            MUSIC_UTILS.INTERVALS.PERFECT_FORTH,
            MUSIC_UTILS.INTERVALS.PERFECT_FIFTH,
            MUSIC_UTILS.INTERVALS.MAJOR_SIXTH,
            MUSIC_UTILS.INTERVALS.MAJOR_SEVENTH]
    };

    return MUSIC_UTILS;
});


