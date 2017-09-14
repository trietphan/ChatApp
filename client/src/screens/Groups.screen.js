import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import { USER_QUERY } from '../graphql/User.query';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
  },
});

// create fake data for the list
// const fakeData = () => _.times(100, i => ({
//   id: i,
//   name: `Group ${i}`,
// }));

class Group extends Component {
  constructor(props) {
    super(props);
    this.goToMessages = this.props.goToMessages
      .bind(this, this.props.group);
  }

  render() {
    const { id, name } = this.props.group;
    const { groupContainer, groupName } = styles;
    return (
      <TouchableHighlight
        key={id}
        onPress={this.goToMessages}
      >
        <View style={groupContainer}>
          <Text style={groupName}>{`${name}`}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

Group.propTypes = {
  goToMessages: PropTypes.func.isRequired,
  group: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

class Groups extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  constructor(props) {
    super(props);
    this.goToMessages = this.goToMessages.bind(this);
  }

  goToMessages(group) {
    const { navigate } = this.props.navigation;
    navigate('Messages', { groupId: group.id, title: group.name });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <Group group={item} goToMessages={this.goToMessages} />;

  render() {
    const { loading, user } = this.props;

    if (loading) {
      return (
        <View style={[styles.loading, styles.container]}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={user.groups}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

Groups.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  loading: PropTypes.bool,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ),
  }),
};

// graphql() returns a func that can be applied to a React component
// set the id variable for USER_QUERY using the component's existing props
const userQuery = graphql(USER_QUERY, {
  options: () => ({
    variables: {
      id: 1,
    },
  }),
  props: ({ data: { loading, user } }) => ({
    loading,
    user,
  }),
});

// Groups props will now have a 'data' paramater with the results
// from graphql (e.g. this.props.data.user)
export default userQuery(Groups);
