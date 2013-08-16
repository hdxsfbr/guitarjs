define(["lib/jquery", "modules/music"], function($, MUSIC_UTILS) {
    var Guitar = function(container) {
        this.$container = container;
        this.openStrings = [MUSIC_UTILS.NOTES.E,
            MUSIC_UTILS.NOTES.B,
            MUSIC_UTILS.NOTES.G,
            MUSIC_UTILS.NOTES.D,
            MUSIC_UTILS.NOTES.A,
            MUSIC_UTILS.NOTES.E];
        this.$fretboard = $("<div/>").attr("id", "fretboard");
    };

    Guitar.prototype.clearFretboard = function() {
        this.$fretboard.find(".string div").css({backgroundColor:""});
    };

    Guitar.prototype.getNoteColor = function(interval) {
        var noteColor = "";
        if(interval === 0) {
            noteColor ="red";
        } else if(interval === 2) {
            noteColor ="blue";
        } else if (interval === 4) {
            noteColor ="green";
        } else {
            noteColor ="yellow";
        }
        return noteColor;
    };
    
    Guitar.prototype.displayScale = function(key, scaleType) {
        this.clearFretboard();

        var scale = MUSIC_UTILS.getScaleNotes(key, scaleType);

        for( var i = 0; i < scale.length; i++) {
            this.$fretboard.find("."+ scale[i].replace("#", "_SHARP")).css({backgroundColor: this.getNoteColor(i)});
        }
    };

    Guitar.prototype.FRETBOARD_LENGTH = 24;

    Guitar.prototype.get$String = function(openNote) {
        var $string = $("<div/>").addClass("string");
        var chromaticScale = MUSIC_UTILS.getChromaticScale(openNote);

        for(var i = 0; i < this.FRETBOARD_LENGTH; i++) {
            var scaleIndex = i % chromaticScale.length;
            var $stringNote = $("<div/>");
            $stringNote.addClass(chromaticScale[scaleIndex].replace("#","_SHARP")).text(chromaticScale[scaleIndex]);
            $string.append($stringNote);
        }

        return $string;
    };

    Guitar.prototype.renderFretboard = function() {
        for(var i = 0; i < this.openStrings.length; i++) {
            this.$fretboard.append(this.get$String(this.openStrings[i]));
        }
        this.$container.html(this.$fretboard);
    };

    Guitar.prototype.render = function() {
        this.renderFretboard();
        this.displayScale(MUSIC_UTILS.NOTES.C, MUSIC_UTILS.MODAL_SCALES.IONIAN);
    };
    return Guitar;
});