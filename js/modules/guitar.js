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
        this.$fretboard.find(".string .note-marker")
            .css({backgroundColor:""})
            .text("\xA0");
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
            this.$fretboard.find("."+ scale[i].replace("#", "_SHARP")).css({backgroundColor: this.getNoteColor(i)}).text(scale[i]);
        }
    };

    Guitar.prototype.FRETBOARD_LENGTH = 25;

    Guitar.prototype.get$String = function(openNote) {
        var $string = $("<div/>").addClass("string");
        var chromaticScale = MUSIC_UTILS.getChromaticScale(openNote);

        for(var i = 0; i < this.FRETBOARD_LENGTH; i++) {
            var scaleIndex = i % chromaticScale.length;

            var $stringNoteContainer = $("<div/>")
                .addClass("note-container");
            var $stringDiv = $("<div/>")
                .addClass("string-div");
            var $stringNote = $("<div/>")
                .addClass(chromaticScale[scaleIndex].replace("#","_SHARP"))
                .addClass("note-marker")
                .text("\xA0");
            $stringNoteContainer
                .append($stringDiv)
                .append($stringNote);

            $string.append($stringNoteContainer);
        }

        return $string;
    };

    Guitar.prototype.renderFretboard = function() {
        for(var i = 0; i < this.openStrings.length; i++) {
            this.$fretboard.append(this.get$String(this.openStrings[i]));
        }
        this.$container.html(this.$fretboard);
    };

    Guitar.prototype.renderControls = function() {
        var chromaticScale = MUSIC_UTILS.getChromaticScale(MUSIC_UTILS.NOTES.C);
        var $controls = $(".controls");
        var $keySelect = $controls.find("select[name=key]");

        for(var i = 0; i < chromaticScale.length; i++) {
            var $option = $("<option/>")
                .attr("value", chromaticScale[i])
                .text(chromaticScale[i]);
            $keySelect.append($option);
        }

        var scales = MUSIC_UTILS.MODAL_SCALES;
        var $scaleSelect = $controls.find("select[name=scale]");
        for(var scaleName in scales) {
            if(scales.hasOwnProperty(scaleName)) {
                $option = $("<option/>")
                    .attr("value", scaleName)
                    .text(scaleName);
                if(scaleName === "MAJOR") {
                    $option.attr("selected", "selected");
                }
                $scaleSelect.append($option)
            }
        }
        var self = this;
        $keySelect.change(function() {
            var chosenKey = $(this).val();
            var chosenScale = $scaleSelect.val();
            if(chosenKey && chosenScale) {
                self.displayScale(chosenKey, chosenScale);
            }
        });
        $scaleSelect.change(function() {
            var chosenKey = $keySelect.val();
            var chosenScale = $(this).val();
            if(chosenKey && chosenScale) {
                self.displayScale(chosenKey, chosenScale);
            }
        });

    };

    Guitar.prototype.render = function() {
        this.renderFretboard();
        this.renderControls();
//        this.displayScale(MUSIC_UTILS.NOTES.C, MUSIC_UTILS.MODAL_SCALES.IONIAN);
    };
    return Guitar;
});