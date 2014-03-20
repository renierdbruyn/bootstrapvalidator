(function($) {
    $.fn.bootstrapValidator.validators.creditCard = {
        /**
         * Return true if the input value is valid credit card number
         * Based on https://gist.github.com/DiegoSalazar/4075533
         *
         * @param {BootstrapValidator} validator The validator plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options Can consist of the following key:
         * - message: The invalid message
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if (value == '') {
                return true;
            }

            // Accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) {
                return false;
            }
            value = value.replace(/\D/g, '');

            // Validate the check sum
            // The Luhn Algorithm
            // http://en.wikipedia.org/wiki/Luhn
            var check = 0, digit = 0, even = false, length = value.length;

            for (var n = length - 1; n >= 0; n--) {
                digit = parseInt(value.charAt(n), 10);

                if (even) {
                    if ((digit *= 2) > 9) {
                        digit -= 9;
                    }
                }

                check += digit;
                even = !even;
            }

            if ((check % 10) != 0) {
                return false;
            }

            // Validate the card number based on pattern
            var cards = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    ccv: ['34', '37']
                },
                DINERS_CLUB: {
                    length: [14],
                    ccv: ['300', '301', '302', '303', '304', '305', '36']
                },
                DINERS_CLUB_US: {
                    length: [16],
                    ccv: ['54', '55']
                },
                DISCOVER: {
                    length: [16],
                    ccv: ['6011', '622126', '622127', '622128', '622129', '62213',
                          '62214', '62215', '62216', '62217', '62218', '62219',
                          '6222', '6223', '6224', '6225', '6226', '6227', '6228',
                          '62290', '62291', '622920', '622921', '622922', '622923',
                          '622924', '622925', '644', '645', '646', '647', '648',
                          '649', '65']
                },
                JCB: {
                    length: [16],
                    ccv: ['3528', '3529', '353', '354', '355', '356', '357', '358']
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    ccv: ['3528', '3529', '353', '354', '355', '356', '357', '358']
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    ccv: ['5018', '5020', '5038', '6304', '6759', '6761', '6762', '6763', '6764', '6765', '6766']
                },
                MASTERCARD: {
                    length: [16],
                    ccv: ['51', '52', '53', '54', '55']
                },
                SOLO: {
                    length: [16, 18, 19],
                    ccv: ['6334', '6767']
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    ccv: ['622126', '622127', '622128', '622129', '62213', '62214',
                          '62215', '62216', '62217', '62218', '62219', '6222', '6223',
                          '6224', '6225', '6226', '6227', '6228', '62290', '62291',
                          '622920', '622921', '622922', '622923', '622924', '622925']
                },
                VISA: {
                    length: ['16'],
                    ccv: ['4']
                }
            };
            var type, prefix;
            for (type in cards) {
                for (prefix in cards[type]['ccv']) {
                    if (value.substr(0, prefix.length) == prefix                // Check the prefix
                        && cards[type]['length'].indexOf(value.length) != -1)   // and length
                    {
                        return true;
                    }
                }
            }

            return false;
        }
    };
}(window.jQuery));