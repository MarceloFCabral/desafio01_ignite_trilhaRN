import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import FaIcon from "react-native-vector-icons/FontAwesome";

interface TaskItemProps {
  title: string;
  id: number;
  editTask: (taskId: number, taskNewTitle: string) => void;
  removeTask: (taskId: number) => void;
}

export function TaskItem({ title, id, editTask, removeTask }: TaskItemProps) {
  const [done, setDone] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [newValue, setnewValue] = useState(title);
  const textInputRef = useRef<TextInput>(null);

  function handleToggleTaskDone() {
    setDone(!done);
  }

  function handleStartEditing() {
    setIsBeingEdited(true);
  }

  function handleCancelEditing() {
    setnewValue(title);
    setIsBeingEdited(false);
  }

  function handleSubmitEditing() {
    editTask(id, newValue);
    setIsBeingEdited(false);
  }

  useEffect(() => {
    if (isBeingEdited) textInputRef.current?.focus();
    else textInputRef.current?.blur();
  }, [isBeingEdited]);
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        testID={`button-${id}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={handleToggleTaskDone}
      >
        <View
          testID={`marker-${id}`}
          style={done ? styles.taskMarkerDone : styles.taskMarker}
        >
          {done && <Icon name="check" size={12} color="#FFF" />}
        </View>

        <TextInput
          value={newValue}
          onChangeText={setnewValue}
          editable={isBeingEdited}
          onSubmitEditing={handleSubmitEditing}
          style={done ? styles.taskTextDone : styles.taskText}
          ref={textInputRef}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isBeingEdited ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <FaIcon name="close" size={20} color={"lightgrey"} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <FaIcon name="pencil" size={20} color={"lightgrey"} />
          </TouchableOpacity>
        )}
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: "rgba(196, 196, 196, 0.24)",
          }}
        />

        <TouchableOpacity
          disabled={isBeingEdited}
          testID={`trash-${id}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(id)}
        >
          <Image
            source={trashIcon}
            style={{ opacity: isBeingEdited ? 0.2 : 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
