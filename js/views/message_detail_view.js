/* vim: ts=4:sw=4:expandtab
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function () {
    'use strict';

    window.Whisper = window.Whisper || {};

    Whisper.MessageDetailView = Backbone.View.extend({
        className: 'message-detail',
        initialize: function(options) {
            this.template = $('#message-detail').html();
            Mustache.parse(this.template);
            this.view = new Whisper.MessageView({model: this.model});
            this.conversation = options.conversation;
        },
        events: {
            'click .resolve': 'resolve',
            'click .back': 'goBack'
        },
        goBack: function() {
            this.trigger('back');
        },
        resolve: function() {
            this.conversation.resolveConflicts();
        },
        render: function() {
            this.$el.html(Mustache.render(this.template, {
                sent_at: moment(this.model.get('sent_at')).toString(),
                received_at: moment(this.model.get('received_at')).toString(),
                tofrom: this.model.isIncoming() ? 'From' : 'To',
                contacts: {
                    name     : this.conversation.getTitle(),
                    avatar   : this.conversation.get('avatar'),
                    conflict : this.model.getKeyConflict()
                }
            }));
            this.view.render().$el.prependTo(this.$el.find('.message-container'));
        }
    });

})();
